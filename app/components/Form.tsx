import { useForm,SubmitHandler, FieldValues } from "react-hook-form"
import Button from "./Button"
export interface Field{
    
    name:string,
    label:string,
    type:string,
    placeholder?:string
}
export interface FormInputs{
    formName:string,
    fields:Field[],
    ButtonName:string,
    onSubmit:any
    schema?:any
}
export function Form({formName,fields,ButtonName,onSubmit,schema}:FormInputs){
    const {register,handleSubmit,formState:{ errors }}=useForm({resolver:schema})
    return(
        <>
        <div className=" max-w-md p-4 text-gray-300">
            <div
            className="text-center text-3xl font-bold py-3"
            >{formName}</div>
            <form 
                onSubmit={handleSubmit(onSubmit)}
                
            >
                
                {fields.map((field:Field)=>(
                    <div className="flex flex-col py-2 " key={field.name}>
                        <label
                            className="text-xl p-2"
                        >{field.label}</label>
                        <input 
                            
                            type={field.type} 
                            placeholder={field.placeholder || field.label}
                            className="bg-gray-600 px-2 py-1 rounded-xl text-lg mx-2 focus:outline-none text-gray-100"
                            {...register(field.name)}
                        />
                        {errors[field.name] && (
                            <p>
                                <div>{(errors[field.name]?.message)?.toString()}</div>
                            </p>
                        )}
                    </div>
                ))}
                <Button 
                 className="w-[96%] justify-center ml-2 mr-2 my-3 "
                name={ButtonName}/>
            </form>
        </div>
        
        </>
    )

}