import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter, Switch, Route } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';

import 'antd/dist/antd.css';
import './index.css';

import * as serviceWorker from './serviceWorker';
import List from './screens/List';
import Text from './components/Text'
import Detail from './screens/Detail';

const { Header, Content, Footer } = Layout;

const routes = (
    <Layout style={{ minHeight: '100vh' }}>
        <Header>
            <Text color='white' fontWeight='900'>Canchas.cl</Text>
        </Header>
        <Content>
            <HashRouter>
                <Switch>
                    <>
                        <Route exact path='/' component={List} />
                        <Route exact path='/detail/:id' component={Detail} />
                    </>
                </Switch>
            </HashRouter>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Canchas.cl desafio Abstract por <a href="https://www.linkedin.com/in/ramonem1/">Ramón Escobar</a></Footer>
    </Layout>
)

ReactDOM.render(routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
