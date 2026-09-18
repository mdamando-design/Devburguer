import { useEffect, useState } from 'react';
import { api } from '../../services/api';


export function CategoriesCarrosel() {
    const [categories, setCategories] = useState([]);

    useEffect( () => {

       async function loadCategories () {
          const { data  } = await api.get('/categories')

          setCategories(data);
       }
       loadCategories();
    }, []);

    return (
        <div>
            <h1>ok</h1>
        </div>
    );
}