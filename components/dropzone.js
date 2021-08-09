import { useDropzone } from 'react-dropzone';
import styles from '../styles/Home.module.css'
import { Button } from 'react-bootstrap'

export default function DropZone(onDrop) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone( onDrop )

    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <div style={{width:400, borderStyle: 'dashed', borderRadius:10, padding:20, height:200}}><center><label className={styles.textoDescricao} style={{ whiteSpace: 'nowrap' }}> Solte suas fotos aqui ...</label></center></div> :
            <Button style={{ backgroundColor: "#00E1FF", border: 0, whiteSpace: "nowrap" }}>
              Escolher Arquivos
            </Button>
        }
      </div>
    )
  }