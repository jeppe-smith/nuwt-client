import React, { Component } from 'react'
import axios from 'axios'
import { Tree } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router'

const { TreeNode } = Tree

export interface Document {
  id: string
  name: string
  alias: string
  path: string
  created: string
  updated: string
  deleted: boolean
  children: Document[]
}

export type DocumentTreeState = {
  documents: Document[]
  fetching: boolean
}

class DocumentTree extends Component<RouteComponentProps, DocumentTreeState> {
  state = {
    documents: [],
    fetching: false
  }

  async componentDidMount() {
    this.setState({ fetching: true })

    try {
      const { data } = await axios('http://localhost:3000/documents/tree')

      this.setState({ documents: data })
    } catch (error) {
      console.error(error)
    } finally {
      this.setState({ fetching: false })
    }
  }

  renderTreeNodes = (documents: Document[]) =>
    documents.map((document) => (
      <TreeNode title={document.name} key={document.id}>
        {this.renderTreeNodes(document.children)}
      </TreeNode>
    ))

  render() {
    return (
      <Tree
        showLine
        onSelect={(ids) => this.props.history.push(`/document/${ids[0]}`)}
      >
        {this.renderTreeNodes(this.state.documents)}
      </Tree>
    )
  }
}

export const DocumentTreeWithRouter = withRouter(DocumentTree)
