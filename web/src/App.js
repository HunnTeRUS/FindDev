import React, { useState, useEffect } from 'react';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import services from './services/api'
import DevItem from './components/DevItem/index';
import DevForm from './components/DevForm/index'


//COMPONENTE:
//O conceito de componentes se aplica ao voce basicamente criar varias partes do codigo sem que uma interfira na outra
//ELA SEMPRE TEM QUE INICIAR COM LETRA MAIUSCULA, EXEMPLO: function Header(){}
//Exemplo na pratica:
//Voce pode criar uma apgina HTML onde sera o componenten Body, outra com o header dessa pagina se chamando Header e por fim,
//outra pagina/componente com o nome Footer, juntar os tres e pronto, voce tem tres componentes nos quais um nao interfere no outro

//PROPRIEDADE:
//Informações que um componente PAI para para os componentes FILHO
//Voce pode ter um componente externo, no qual voce quer chamar ele mas passando um valor a ele, exemplo: <Header title="Teste"/>
//Exemplo na pratica:
//Renderizar um header com bom dia/tarde, assim, no modulo PAI, voce pode pegar o horario atual e dependendo de qual for voce mandar como propriedade ao header
//o texto de bom dia/tarde e deixar dinamico.

//ESTADO:
//Informações mantidas pelo componente (Lembrar: imutabilidade)
//Leigamente dizendo, podemos trata-lo como sendo um get e Set, onde um estado apos ser criado não pode ser alterado, basicamente voce cria outra instancia dele ao for "alterar" ele

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {

    async function loadDevs(){
      const response = await services.get('/devs');
      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data){
    const response = await services.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
