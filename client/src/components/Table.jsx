import { clsx } from 'clsx';
import { Button } from './ui/Button';
import { Edit, Trash2 } from 'lucide-react';

export default function Table({ headers, data, renderRow, actions, showEdit = true, showDelete = true, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-dark-800">
        <thead className="bg-gray-50 dark:bg-dark-700/50">
          <tr>
            {headers.map((header, idx) => (
              <th 
                key={idx}
                scope="col" 
                className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
            {actions && (
              <th scope="col" className="relative px-6 py-4">
                <span className="sr-only">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-dark-800">
          {data.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors">
              {renderRow(item)}
              {actions && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    {showEdit && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-blue-600 hover:text-blue-900 hover:bg-blue-50"
                          onClick={() => onEdit && onEdit(item)}
                        >
                            <Edit className="w-4 h-4" />
                        </Button>
                    )}
                    {showDelete && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-600 hover:text-red-900 hover:bg-red-50"
                          onClick={() => onDelete && onDelete(item)}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
