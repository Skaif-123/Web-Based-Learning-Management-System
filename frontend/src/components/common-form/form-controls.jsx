import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const FormControls = ({ formControls = [], formData, setFormData }) => {
  const renderByComponentByType = (getControlItem) => {
    let element = null;
    const value = formData[getControlItem.name] || "";
    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={value}
            onChange={(e) => setFormData({ ...formData, [getControlItem.name]: e.target.value })}
          />
        );

        break;
      case "select":
        element = (
          <Select
          onValueChange={(value)=> setFormData({...formData,[getControlItem.name]:value})}
          value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                  <SelectItem key={optionItem.id} value={optionItem.id}>
                    {optionItem.label}
                  </SelectItem>
                ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            value={value}
            onChange={(e) => setFormData({ ...formData, [getControlItem.name]: e.target.value })}
          />
        );
        break;

      default:
        element = (
          <Input
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={value}
            onChange={(e) => setFormData({ ...formData, [getControlItem.name]: e.target.value })}
          />
        );
        break;
    }
    return element;
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid gap-2">
            <div key={controlItem.name}>
              <Label htmlFor={controlItem.name} className="pb-2">{controlItem.label}</Label>
              {renderByComponentByType(controlItem)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FormControls;
