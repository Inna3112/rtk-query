import {useState} from 'react';
import {useGetGoodsQuery, useAddProductMutation, useDeleteProductMutation} from './store';
import './App.css';

function App() {
    const [count, setCount] = useState('');
    const [newProduct, setNewProduct] = useState('');
    const { data = [], isLoading } = useGetGoodsQuery(count);
    const [addProduct, {isError}] = useAddProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    const handleAddProduct = async () => {
        if (newProduct) {
            await addProduct({name: newProduct}).unwrap();
            setNewProduct('')
        }
    }

    const handleDeleteProduct = async (id) => {
        deleteProduct(id).unwrap();
    }

    if (isLoading) return <div>Loading...</div>
    if (!data) return <div>Missing post!</div>

  return (
    <div className='App'>
        <select value={count} onChange={(e) => setCount(e.currentTarget.value)}>
            <option value="''">all</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <input type="text"
               value={newProduct}
               onChange={(e) => setNewProduct(e.currentTarget.value)}/>
        <button type="submit" onClick={() => handleAddProduct()}>+</button>
        <ul>
          {data.map(item => (
              <li key={item.id}>{item.name}
                  <span
                  onClick={() => handleDeleteProduct(item.id)}
                  style={{cursor: 'pointer'}}
                  >
                      -
                  </span>
              </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
