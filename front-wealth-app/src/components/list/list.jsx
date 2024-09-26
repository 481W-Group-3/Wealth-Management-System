const List = ({ items, renderItem, onDelete }) => (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {items.length > 0 && Object.keys(items[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              {renderItem(item)}
              <td>
                <button onClick={() => onDelete(item.id)} className="delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
export default List;