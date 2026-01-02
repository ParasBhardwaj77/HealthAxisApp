export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: `${API_BASE_URL}/auth/login`,
        REGISTER: `${API_BASE_URL}/auth/register`,
    },
    ADMIN: {
        DOCTORS: `${API_BASE_URL}/doctors`,
        PATIENTS: `${API_BASE_URL}/admin/patient-list`,
        APPOINTMENTS: `${API_BASE_URL}/admin/appointments`,
    },
    PATIENT: {
        DOCTORS: `${API_BASE_URL}/doctors`,
        APPOINTMENTS: `${API_BASE_URL}/appointments`,
        MY_APPOINTMENTS: `${API_BASE_URL}/appointments/my`,
    },
};

export const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    return response;
};

export default API_BASE_URL;
