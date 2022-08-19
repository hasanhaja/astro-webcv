import { createSignal, Show } from "solid-js";
import { Form, FormType } from "../schema/Form";

type SearcherProps = {
  handleSubmit: (formData?: FormType) => void;
};

const Searcher = ({ handleSubmit }: SearcherProps) => {
  const [formData, setFormData] = createSignal<FormType>("");
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
        class="bg-gray-200 border-4 flex h-auto rounded-md gap-1"
      >
        <input
          class="flex-grow p-4 rounded-md"
          type="text"
          id="city"
          name="city"
          placeholder="Search (e.g. Dubai)"
          value={formData()}
          onFocus={(e) => setError(false)}
          onChange={(e) => {
            try {
              const parsed = Form.parse(e.currentTarget.value);
              setFormData(parsed);
            } catch (e) {
              console.error("Parse failed");
              setError(true);
            }
          }}
        />
        <input class="cursor-pointer text-3xl py-2 px-6 md:px-24 hover:bg-gray-400 rounded-md" type="submit" value="🔎" />
      </fieldset>
      <Show when={error()}>
          <p class="text-red-700 p-2">Please enter a valid location</p>
      </Show>
    </form>
  );
};

export default Searcher;