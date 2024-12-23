import { useForm,SubmitHandler, FieldValues } from "react-hook-form"
import Button from "./Button"
export interface Field{
    name:string,
    label:string,
    type:string,
    placeholder?:string
}
export interface FormInputs{
    fields:Field[],
    ButtonName:string,
    onSubmit:SubmitHandler<FieldValues>,
    schema?:any
}
export function Form({fields,ButtonName,onSubmit,schema}:FormInputs){
    const {register,handleSubmit,formState:{ errors }}=useForm({resolver:schema})
    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field:Field)=>(
                    <>
                        <label>{field.label}</label>
                        <input 
                            
                            type={field.type} 
                            placeholder={field.placeholder || field.label}
                            {...register(field.name)}
                        />
                        {errors[field.name] && (
                            <p>
                                <div>{(errors[field.name]?.message)?.toString()}</div>
                            </p>
                        )}
                    </>
                ))}
                <Button name={ButtonName}/>
            </form>
        
        </>
    )

}