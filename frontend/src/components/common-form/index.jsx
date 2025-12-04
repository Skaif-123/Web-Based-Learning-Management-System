import { Button } from '../ui/button'
import FormControls from './form-controls'

const CommonForm = ({ handleSubmit, buttonText, formControls = [], formData, setFormData, isButtonDisabled=false }) => {

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* {render all form controls over here} */}
        <FormControls formControls={formControls} formData={formData} setFormData={setFormData} />
        <Button disabled={isButtonDisabled} type="submit" className="mt-5 w-full">{buttonText || "submit"}</Button>
      </form>
    </>
  )
}

export default CommonForm