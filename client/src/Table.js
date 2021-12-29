const Table = ({ headings, data, onDelete, onEdit }) => {
  const hasAction = onDelete || onEdit;

  // Loop over data and create a row for each item
  return (
    <table className="border border-collapse w-full">
      <thead>
        <tr>
          {headings.map((heading) => (
            <th className="border border-collapse" key={heading}>
              {heading}
            </th>
          ))}
          {hasAction && <th className="border border-collapse">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {/* iterate over object to get the values as table data */}
            {Object.entries(row).map(
              ([key, value]) =>
                //skip value if value starts with __
                !key.startsWith("_") && (
                  <td
                    className="border border-collapse px-2 py-1 text-center"
                    key={value}
                  >
                    {value}
                  </td>
                )
            )}

            {hasAction && (
              <td className="border border-collapse px-2 py-1 text-center space-x-1">
                {onDelete && (
                  <button
                    title="Delete"
                    onClick={() => onDelete(row.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold p-1 rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
                {onEdit && (
                  <button
                    title="Edit"
                    onClick={() => onEdit(row.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
