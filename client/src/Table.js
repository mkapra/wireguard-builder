const Table = ({ headings, data, actions }) => {
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
          {actions && <th className="border border-collapse">Actions</th>}
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
                    className="border border-collapse p-2 text-center"
                    key={value}
                  >
                    {value}
                  </td>
                )
            )}

            {actions && (
              <td className="border border-collapse p-2 text-center">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
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
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;