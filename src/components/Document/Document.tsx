import React, { Component } from 'react'
import { Layout, Tabs } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router'
import axios from 'axios'

export interface IDocument {
  id: string
  name: string
  alias: string
  path: string
  created: string
  updated: string
  deleted: boolean
}

export type DocumentState = {
  document: null | IDocument
}

const { Header, Content } = Layout
const { TabPane } = Tabs

export class Document extends Component<
  RouteComponentProps<{ id: string }>,
  DocumentState
> {
  constructor(props: RouteComponentProps<{ id: string }>) {
    super(props)

    this.state = {
      document: null
    }
  }

  fetchDocument = async () => {
    if (this.props.match.params.id) {
      const { data } = await axios(
        `http://localhost:3000/documents/${this.props.match.params.id}`
      )

      this.setState({
        document: data
      })
    }
  }

  componentDidMount() {
    this.fetchDocument()
  }

  componentDidUpdate() {
    this.fetchDocument()
  }

  render() {
    const { document } = this.state

    if (!document) {
      return null
    }

    return (
      <Layout>
        <Header>{document.name}</Header>
        <Content>
          <Tabs type="card">
            <TabPane tab="Tab Title 1" key="1">
              <p>Content of Tab Pane 1</p>
              <p>Content of Tab Pane 1</p>
              <p>Content of Tab Pane 1</p>
            </TabPane>
            <TabPane tab="Tab Title 2" key="2">
              <p>Content of Tab Pane 2</p>
              <p>Content of Tab Pane 2</p>
              <p>Content of Tab Pane 2</p>
            </TabPane>
            <TabPane tab="Tab Title 3" key="3">
              <p>Content of Tab Pane 3</p>
              <p>Content of Tab Pane 3</p>
              <p>Content of Tab Pane 3</p>
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    )
  }
}

export const DocumentWithRouter = withRouter(Document)
