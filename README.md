# Bot de Negociação Automatizada

O bot que foi implementado executa uma estratégia de negociação automatizada com base em análise técnica. Ele verifica várias condições, como tendências de preço, níveis de suporte e resistência, indicadores de momentum (RSI e MACD) e volume de negociação, para tomar decisões de compra e venda.

## Configuração do Bot

Antes de executar o bot, é necessário realizar as seguintes configurações:

1. Certifique-se de ter o Node.js instalado em seu ambiente.
2. Crie uma conta na Binance e obtenha uma chave de API e um segredo de API.
3. Clone este repositório ou crie um novo projeto Node.js e instale as dependências necessárias com o seguinte comando:

`npm install binance-api-node dotenv`

4. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis com suas informações de API da Binance:
   `API_KEY=suakey`
   `API_SECRET=suasecret`

5. Personalize as configurações do bot no arquivo `config.js`, se necessário, definindo o símbolo de negociação, intervalo de velas e outros parâmetros.

## Executando o Bot

Para executar o bot, execute o seguinte comando no terminal na raiz do projeto:

`node tradingBot.js`

## Lógica do Bot

A lógica básica do bot é a seguinte:

1. Obtém o preço atual do ativo de negociação (no exemplo, é usado o par de negociação BTCUSDT).
2. Obtém o histórico de preços e velas do ativo em um determinado intervalo de tempo.
3. Calcula as médias móveis de curto prazo e longo prazo com base no histórico de preços.
4. Calcula o nível de suporte e o nível de resistência com base no histórico de preços.
5. Calcula o RSI (Índice de Força Relativa) com base no histórico de preços.
6. Calcula o MACD (Moving Average Convergence Divergence) com base no histórico de preços.
7. Verifica as condições para tomar decisões de compra e venda:
   - Se a média móvel de curto prazo for maior que a média móvel de longo prazo e o preço atual estiver próximo ou abaixo do nível de suporte, o RSI estiver abaixo de 30 e o MACD for positivo, o bot considera uma tendência de alta e sugere uma compra.
   - Se a média móvel de curto prazo for menor que a média móvel de longo prazo e o preço atual estiver próximo ou acima do nível de resistência, o RSI estiver acima de 70 e o MACD for negativo, o bot considera uma tendência de baixa e sugere uma venda.
8. O bot imprime mensagens de acordo com as decisões tomadas, como "Tendência de alta, considerar compra" ou "Tendência de baixa, considerar venda".

Observe que o código fornecido é um exemplo básico que deve ser adaptado e aprimorado de acordo com as suas necessidades específicas, incluindo gerenciamento de risco, estratégias adicionais, configurações de tempo, entre outros. É importante entender as estratégias de negociação e realizar testes adequados antes de usar um bot de negociação automatizada em um ambiente de produção.
