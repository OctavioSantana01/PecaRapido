import {useState, ChangeEvent, FormEvent} from 'react'
import Head from 'next/head';
import styles from './styles.module.scss';
import {Header} from '../../components/Header'
import {SetUpAPI} from '../../services/api'

import {FiUpload} from 'react-icons/fi'

import {canSSRAuth} from '../../utils/canSSRAuth'

type ItemProps = {
    id:string;
    name:string;
}

interface CategoryProps{
    categoryList: ItemProps[];
}

export default function Product({categoryList}: CategoryProps ){

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    const [categories, setCategories] = useState(categoryList || [])
    const [categorySelected, setCategorySelected] = useState(0); 
    function handleFile(e: ChangeEvent<HTMLInputElement>){

        if(!e.target.files){
            return;
        }

        const image = e.target.files[0];

        if(!image){
            return;
        }

        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(e.target.files[0]))

    }

    function handleChangeCategory(event){
       setCategorySelected(event.target.value)
    }

    async function handleRegister(event: FormEvent){
        event.preventDefault();

        try{
            const data = new FormData();

            if(name === '' || price === '' || description === '' || imageAvatar === null){
               console.log("Preencha todos os campos!");
               return;
            }

            data.append('name',name);
            data.append('price',price);
            data.append('descricao',description);
            data.append('category_id',categories[categorySelected].id);
            data.append('file', imageAvatar);

            const apiClient = SetUpAPI();

            await apiClient.post('/produtos', data)

            alert("Produto Cadastrado com Sucesso!")

        }catch(err){
            console.log("Erro ao cadastrar", err)
        }

        setName('');
        setPrice('');
        setDescription('');
        setImageAvatar('');
    }
    return(
        <>
        <Head>
            <title>Novo Produto - PeçaRápido</title>
        </Head>
        <div>
           <Header/>
           
           <main className={styles.container}>
             <h1>Novo Produto</h1>

             <form className={styles.form} onSubmit={handleRegister}>

                <label className={styles.labelAvatar}>
                  <span>
                    <FiUpload size={25} color="#FFF"/>
                  </span>
                  <input type='file' accept='image/png, image/jpeg' onChange={handleFile}/>

                  {avatarUrl &&(
                    <img 
                    className={styles.preview}
                    src={avatarUrl}
                    alt= "Foto do Produto"
                    width={250}
                    height={250}
                    />
                  )}
                </label>

                <select value={categorySelected} onChange={handleChangeCategory}>
                    {categories.map((item, index)=> {
                        return(
                            <option key={item.id} value={index}>
                              {item.name}
                            </option>
                        )
                    })}
                </select>

                
                <input
                  type='text'
                  placeholder='Digite o nome do Produto'
                  className={styles.input}
                  value={name}
                  onChange={(e)=> setName(e.target.value)}
                />

                <input
                  type='text'
                  placeholder='Preço do Produto'
                  className={styles.input}
                  value={price}
                  onChange={(e)=> setPrice(e.target.value)}
                />

                <textarea
                 placeholder='Descreva seu Produto'
                 className={styles.input}
                 value={description}
                onChange={(e)=> setDescription(e.target.value)}
                />

                <button className={styles.buttonAdd} type='submit'>
                    Cadastrar
                </button>

             </form>
           </main>
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async(ctx)=> {

    const apiClient = SetUpAPI(ctx)

    const response = await apiClient.get('/categoria');
    return{
        props: {
            categoryList: response.data
        }
    }
})