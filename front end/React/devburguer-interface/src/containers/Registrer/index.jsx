import { Container, LeftContainer, RightContainer, Title, Form, InputContainer,  Label, Link } from "./styles"
import Logo from '../../assets/Logo.svg'
import { Button } from '../../components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { api} from  '../../services/api';
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";


export function Register() {

    const navigate = useNavigate();
    const schema = yup.object({
    name: yup.string().required('O nome é Obrigatório'),
    email: yup.string()
              .email('Digite um e-mail válido')
              .required('O e-mail é obrigatorio'),
    password: yup.string()
                 .min(6, 'A senha deve ter no minimo 6 caracteres.') 
                 .required('Digite sua senha.'),
    confirmPassword: yup.string()      
                        .oneOf([yup.ref('password')], 'As senhas devem ser iguais')
                        .required('Confirme sua senha.'),     
})
.required();

    const {
        register,
        handleSubmit,
        formState: { errors },
        } = useForm({
            resolver: yupResolver(schema),
        });

        const onSubmit = async (data) => {
            await toast.promise( 
                api.post('/users', {
                   name: data.name,
                   email: data.email,
                   password:data.password,
            }),
        {
            pending: 'Verificando seus dados',
            success: {
                render() {
                    setTimeout( () =>{
                        navigate('/login');
                    }, 2000);
                    return 'Seja Bem-Vindo(a)';   
                },
            },
            error: 'Ops, algo deu errado! Tente novamente.',
        },
    );  
}
    return (
        <Container>
            <LeftContainer>

                <img src={Logo} alt="logo-devburguer" />

            </LeftContainer>

            <RightContainer>
                <Title>
                    Criar Conta
                </Title>
                <Form onSubmit={handleSubmit(onSubmit)}>

                     <InputContainer>
                        <Label>Nome</Label>
                        <input type='text' {...register('name')} />
                        <p>{errors?.name?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <Label>Email</Label>
                        <input type='email' {...register('email')} />
                        <p>{errors?.email?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <Label>senha</Label>
                        <input type='password' {...register('password')} />
                        <p>{errors?.password?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <Label>Confirmar senha</Label>
                        <input type='password' {...register('confirmPassword')} />
                        <p>{errors?.confirmPassword?.message}</p>
                    </InputContainer>
                    
                    
                    <Button type='submit'>Entrar</Button>
                </Form>
                <p> Já possui conta ? <Link to='/login'>Criar Conta</Link>
                </p>
            </RightContainer>

        </Container>
    );
}