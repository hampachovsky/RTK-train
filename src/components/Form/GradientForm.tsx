import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import style from './Form.module.css';

type PropsType = {
  submitAction: (firstHex: string, secondHex: string) => void;
  firstHex?: string;
  secondHex?: string;
  isEditMode: boolean;
};

type FormType = {
  firstHex: string;
  secondHex: string;
};

const schema = yup.object({
  firstHex: yup
    .string()
    .matches(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, 'Invalid hex format, ')
    .required('Field is required'),
  secondHex: yup
    .string()
    .matches(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, 'Invalid hex format')
    .required('Field is required'),
});

export const GradientForm: React.FC<PropsType> = ({
  submitAction,
  firstHex,
  secondHex,
  isEditMode,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });
  const onSubmit: SubmitHandler<FormType> = (data) => {
    submitAction(data.firstHex, data.secondHex);
  };
  return (
    <div className={style.formWrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <div>
          <h4 className={style.fieldLabel}>First hex value</h4>
          <input
            defaultValue={firstHex}
            className={style.field}
            placeholder='#FFFFFF'
            {...register('firstHex')}
          />
          <p className={style.errorMessage}>{errors.firstHex?.message}</p>
        </div>
        <div>
          <h4 className={style.fieldLabel}>Second hex value</h4>
          <input
            defaultValue={secondHex}
            placeholder='#FFFFFF'
            className={style.field}
            {...register('secondHex')}
          />
          <p className={style.errorMessage}>{errors.secondHex?.message}</p>
        </div>
        <button
          disabled={!isDirty || !isValid || isSubmitting}
          className={style.submitBtn}
          type='submit'
        >
          {isEditMode ? 'Edit gradient' : 'Add new gradient'}
        </button>
      </form>
    </div>
  );
};
