import { Button } from '../ui/button'
import FormControls from './form-controls'

const CommonForm = ({handleSubmit,buttonText,formControls=[]}) => {
   
  return (
    <>
    <form onSubmit={handleSubmit}>  
        {/* {render all form controls over here} */}
        <FormControls formControls = {formControls} />
        <Button type="submit" className="mt-5 w-full">{buttonText||"submit"}</Button>
    </form>
    </>
  )
}

export default CommonForm