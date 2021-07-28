import { useForm } from 'react-hook-form';

import { Category } from '@app/api/categories';

const Form: React.FC = () => {
  const { register, handleSubmit } = useForm<Category>();
  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-6">
        <label className="block">
          <span>Nombre</span>
          <input className="mt-1 w-full" type="text" {...register('name')} />
        </label>
        <label className="block">
          <span>Color</span>
        </label>
      </div>
    </form>
  );
};

export default Form;
