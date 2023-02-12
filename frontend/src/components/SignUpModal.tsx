import React from 'react'
import { User } from '../models/user';
import { useForm } from 'react-hook-form';
import { SignUpCredentials } from '../network/users_api';
import * as UsersApi from '../network/users_api';

interface SignUpModalProps {
    onDismiss: () => void,
    onSignUpSuccessful: (user: User) => void,
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpCredentials>();

    async function onSubmit(credentials: SignUpCredentials) {
        try {
            const newUser = await UsersApi.signUp(credentials);
            onSignUpSuccessful(newUser);
        } catch (error) {
            alert(error);
            console.error(error);
        }
    }

  return (
    <div></div>
  );
}

export default SignUpModal