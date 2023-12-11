import { View, Text } from 'react-native'
import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetch = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const reponse = await axios.get('http://localhost:3000/api/products')
            setData(reponse.data)
            setIsLoading(false)
        } catch (error) {
            setError(error)
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    const refetch = () => {
        setIsLoading(false)
        fetchData();
    }

  return { data, isLoading, error, refetch }
}

export default useFetch