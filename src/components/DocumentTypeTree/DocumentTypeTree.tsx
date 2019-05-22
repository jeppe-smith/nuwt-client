import React, { FC, useState, useEffect } from 'react'
import { Tree } from 'antd'
import axios from 'axios'

export interface IDocumentType {
  id: string
  name: string
  alias: string
}

const { TreeNode } = Tree

export const DocumentTypeTree: FC = () => {
  const [documentTypes, setDocumentTypes] = useState<IDocumentType[]>([])

  useEffect(() => {
    async function fetchDocumentTypes() {
      const { data } = await axios('http://localhost:3000/document-types')

      setDocumentTypes(data)
    }

    fetchDocumentTypes()
  })

  return (
    <Tree>
      {documentTypes.map((documentType) => (
        <TreeNode title={documentType.name} key={documentType.id} />
      ))}
    </Tree>
  )
}
