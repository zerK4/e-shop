import { create } from 'zustand'
import axios from 'axios'
import { CategoryInterface } from '@/types/Product.type';

export interface ProductStoreInterface {
    products: {}[],
    categories: CategoryInterface[],
    getCategories: () => Promise<void>;
    setCategories: (data: any) => void;
}

export const useProductStore = create<ProductStoreInterface>((set, get) => ({
    products: [{}],
    categories: [{
        name: '',
        link: '',
        image: ''
    }],
    getCategories: async () => {
        const {data} = await axios({
            method: 'GET',
            url: 'https://fakestoreapi.com/products/categories'
        })
        console.log(data);
        
        set({ products: data })
    },
    setCategories: (data) => {

        set({ categories: data })

        console.log(data);
        
    }
}))