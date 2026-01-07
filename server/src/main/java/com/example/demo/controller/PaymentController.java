package com.example.demo.controller;

import com.example.demo.dto.PaymentRequest;
import com.example.demo.dto.PaymentResponse;
import com.example.demo.entity.Appointment;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.repository.AppointmentRepository;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

        @Value("${stripe.secret.key:}")
        private String stripeSecretKey;

        @Value("${stripe.public.key:}")
        private String stripePublicKey; // Just in case we need to send it to frontend

        @Value("${app.frontend.url}")
        private String frontendUrl;

        private final AppointmentRepository appointmentRepository;

        @PostMapping("/create-checkout-session")
        public PaymentResponse createCheckoutSession(@RequestBody PaymentRequest paymentRequest)
                        throws StripeException {
                Stripe.apiKey = stripeSecretKey;

                // Fetch appointment details if needed, for metadata
                Appointment appointment = appointmentRepository
                                .findById(java.util.Objects.requireNonNull(paymentRequest.getAppointmentId()))
                                .orElseThrow(() -> new RuntimeException("Appointment not found"));

                String YOUR_DOMAIN = java.util.Objects.requireNonNull(frontendUrl); // Frontend URL

                SessionCreateParams params = SessionCreateParams.builder()
                                .setMode(SessionCreateParams.Mode.PAYMENT)
                                .setSuccessUrl(YOUR_DOMAIN
                                                + "/payment/success?session_id={CHECKOUT_SESSION_ID}&appointment_id="
                                                + paymentRequest.getAppointmentId())
                                .setCancelUrl(YOUR_DOMAIN + "/payment/cancel?appointment_id="
                                                + paymentRequest.getAppointmentId())
                                .addLineItem(
                                                SessionCreateParams.LineItem.builder()
                                                                .setQuantity(1L)
                                                                .setPriceData(
                                                                                SessionCreateParams.LineItem.PriceData
                                                                                                .builder()
                                                                                                .setCurrency("usd")
                                                                                                .setUnitAmount(10000L) // $100.00
                                                                                                                       // in
                                                                                                                       // cents
                                                                                                .setProductData(
                                                                                                                SessionCreateParams.LineItem.PriceData.ProductData
                                                                                                                                .builder()
                                                                                                                                .setName("Doctor Consultation")
                                                                                                                                .setDescription("Appointment with "
                                                                                                                                                + appointment.getDoctorName())
                                                                                                                                .build())
                                                                                                .build())
                                                                .build())
                                .build();

                Session session = Session.create(params);

                return new PaymentResponse(session.getUrl());
        }

        @PostMapping("/confirm")
        public ResponseEntity<?> confirmPayment(@RequestBody com.example.demo.dto.PaymentConfirmRequest request) {
                try {
                        // Verify session if needed using Stripe API
                        Stripe.apiKey = stripeSecretKey;
                        Session session = Session.retrieve(request.getSessionId());

                        if ("paid".equals(session.getPaymentStatus())) {
                                Appointment appointment = appointmentRepository.findById(request.getAppointmentId())
                                                .orElseThrow(() -> new RuntimeException("Appointment not found"));

                                appointment.setPaymentStatus("PAID");
                                // Also ensure status is UPCOMING/CONFIRMED if it was pending
                                appointment.setStatus(Appointment.AppointmentStatus.UPCOMING);
                                appointmentRepository.save(appointment);
                                return ResponseEntity.ok("Payment confirmed");
                        } else {
                                return ResponseEntity.badRequest().body("Payment not successful");
                        }

                } catch (StripeException e) {
                        return ResponseEntity.badRequest().body("Error verifying payment: " + e.getMessage());
                }
        }
}
