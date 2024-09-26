const Form = ({ fields, values, onChange, onSubmit }) => (
    <form onSubmit={onSubmit}>
      {fields.map(field => (
        <div key={field.name} className="form-group">
          <label>{field.label}</label>
          <input
            type={field.type}
            placeholder={field.placeholder}
            value={values[field.name]}
            onChange={(e) => onChange({ ...values, [field.name]: e.target.value })}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
  
export default Form;