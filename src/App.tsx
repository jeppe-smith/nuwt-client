import React, { FC } from 'react'
import { Layout } from 'antd'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { DocumentTreeWithRouter } from './components/DocumentTree'
import { DocumentWithRouter } from './components/Document'
import { DocumentTypeTree } from './components/DocumentTypeTree'

const { Sider, Header, Content } = Layout

const App: FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Layout style={{ background: '#fff' }}>
            <Header style={{ backgroundColor: '#3B3B98', color: '#fff' }}>
              NUWT
            </Header>
            <Content>
              <DocumentTreeWithRouter />
              <DocumentTypeTree />
            </Content>
          </Layout>
        </Sider>
        <Layout>
          <Header style={{ backgroundColor: '#3B3B98', color: '#fff' }}>
            Header
          </Header>
          <Content>
            <Switch>
              <Route path="/document/:id">
                <DocumentWithRouter />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  )
}

export default App
