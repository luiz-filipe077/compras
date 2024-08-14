'use client'
import React, { useState } from 'react'
import './MarketCar.css';

interface ICurso {
    id: number,
    titulo: string,
    preco: number
}

interface IshoppingItem{
    produto:ICurso,
    quantidade: number

}



const cursos: ICurso[] = [
    {id:1, titulo:'Iphone 12', preco: 3500.00},
    {id:2, titulo:'Samsung S23', preco: 4000.00},
    {id:3, titulo:'Iphone 14', preco: 4500.00},
    {id:4, titulo:'Samsung S22', preco: 2900.00},
    {id:5, titulo:'Xiaomi Note 12', preco: 1500.00}
]

const formatarPreco = (preco:number): string => preco.toFixed(2);

const MarketCarPages = () => {
 const[shoppingCurso, setShoppingCurso] = useState<IshoppingItem[]>([])
 const handleAddCurso = (id:number) => {
    const curso = cursos.find((curso) => curso.id === id)
    
    const cursoExisteShopping = shoppingCurso.find(item => item.produto.id === id)
    
    if(cursoExisteShopping){
        const newShoppingCurso:IshoppingItem[] = shoppingCurso.map(item =>{

            if(item.produto.id === id)({

                ...item,
                quantidade: item.quantidade++
            })
            return item
        })
        setShoppingCurso(newShoppingCurso)
        return
    }


    const carItem:IshoppingItem = {
        produto: curso !,
        quantidade: 1,
    }
    const newShoppingCurso:IshoppingItem[] = [...shoppingCurso, carItem]
    setShoppingCurso(newShoppingCurso)
 }

 const handleRemoveCurso = (id : number) => {
    const cursoExisteShopping = shoppingCurso.find((item) => item.produto.id === id)

if(cursoExisteShopping!.quantidade>1){
    const newShoppingCurso:IshoppingItem[] = shoppingCurso.map(item =>{
        if(item.produto.id === id)({
            ...item,
            quantidade:item.quantidade--
        })

return item
    })
   setShoppingCurso(newShoppingCurso)
   return

   


}
const newShoppingCurso: IshoppingItem[] = shoppingCurso.filter(item => item.produto.id !== id)
setShoppingCurso(newShoppingCurso)
 }
 
 // total
 const totalCurso = shoppingCurso.reduce((total, item) => {
    return total + (item.produto.preco * item.quantidade);
 },0)


 return (
    <div className="container">
        <ul>
            {cursos.map(curso => (
                <li key={curso.id}>
                    <div>
                        <p>{curso.titulo}</p>
                        <p>R${formatarPreco(curso.preco)}</p>
                    </div>
                    <button onClick={() => handleAddCurso(curso.id)}>Adicionar</button>
                </li>
            ))}
        </ul>
        <h1>Carrinho de Compras R${formatarPreco(totalCurso)}</h1>
        <ul>
            {shoppingCurso.map((item) => (
                <li key={item.produto.id}>
                    <div>
                        <p>Título: {item.produto.titulo}</p>
                        <p>Preço: R${formatarPreco(item.produto.preco)}</p>
                        <p>Quantidade: {item.quantidade}</p>
                        <p>Total: R${formatarPreco(item.produto.preco * item.quantidade)}</p>
                    </div>
                    <button onClick={() => handleRemoveCurso(item.produto.id)}>Remover</button>
                </li>
            ))}
        </ul>
        <div className="total">
            <p>Total do Carrinho: R${formatarPreco(totalCurso)}</p>
        </div>
    </div>
);

}

export default MarketCarPages