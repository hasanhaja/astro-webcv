import { createSignal } from "solid-js";
import { Form, FormType } from "../schema/Form";

type SearcherProps = {
  handleSubmit: (formData?: FormType) => void;
};

const Searcher = ({ handleSubmit }: SearcherProps) => {
  const [formData, setFormData] = createSignal<FormType>("");
  // TODO City does not exist error
  const [error, setError] = createSignal(false);
  return (
    <form
      class="mb-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(formData());
        setFormData("");
      }}
    >
      <fieldset
        class="bg-red-200 border-4 flex h-auto rounded-md"
      >
        <input
          class="flex-grow-1 p-4"
          type="text"
          id="city"
          name="city"
          placeholder="Search (e.g. Dubai)"
          value={formData()}
          onFocus={(e) => setError(false)}
          onChange={(e) => {
            try {
              const parsed = Form.parse(e.target.value);
              setFormData(parsed);
            } catch (e) {
              console.error("Parse failed");
              setError(true);
            }
          }}
        />
        <input class="text-3xl py-2 px-6" type="submit" value="🔎" />
      </fieldset>
    </form>
  );
};

export default Searcher;