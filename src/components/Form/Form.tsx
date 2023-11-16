import "./Form.scss";

interface FormProps {
  inputs: string[];
  heading: string;
}

const Form = ({ heading, inputs }: FormProps) => {
  return (
    <div className="form-container">
      <h3>{heading}</h3>
      <form>
        {inputs.map((input) => (
          <label key={input}>
            {input}
            <input />
          </label>
        ))}
      </form>
      <button type="submit">{heading}</button>
    </div>
  );
};

export default Form;
