import {useState, useCallback, useEffect } from "react"

function Pagination() {
  let api=`https://jsonplaceholder.typicode.com/posts`
  const [data,setData]=useState([])
  let [page,setPage]=useState(1)
  const [loading,setLoading]=useState(true)

  const getData= useCallback(async ()=>{
    setLoading(true)
    try {
      let js= await fetch(api)
      let data= await js.json()
      setData(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  },[]) // getData is created once, only on component render

  useEffect(()=>{
    getData()
  },[getData]) // putting getData inhere will've been required if i had any dependency over useCallback. In this case, getData never re-creates

  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          {data.slice(page*10-10,page*10).map((item) => {
            return <div key={item.id}>{item.title}</div>;
          })}
          <div className="flex justify-center mt-10 items-center gap-5 cursor-pointer">
            <span onClick={()=>setPage(Math.max(page-1,1))}>⬅️</span>
            {[...Array(data.length/10)].map((_,id)=>{
              return <span 
                        className={page==id+1?'text-blue-600 font-bold':''} 
                        onClick={()=>(setPage(id+1))} 
                        key={id+1}> {id+1} </span>
            })}
            <span onClick={()=>setPage(Math.min(page+1,Math.ceil(data.length/10)))}>➡️</span>
          </div>
        </>
      )}
    </>
  );
}

export default Pagination