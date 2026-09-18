import { CategoriesCarrosel } from "../../components/CategoriesCarrosel";
import { Banner, Container, Content } from "./styles";

export function Home() {

    return (
        <main>
            <Banner>
                <h1>Bem Vindo(a)!</h1>
            </Banner>

            <Container>
                <Content>
                    <CategoriesCarrosel/>
                    <div>Carrossel Produtos</div>
                </Content>
            </Container>

        </main>
    );
}