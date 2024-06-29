import React from 'react'
import './MeetTheSuperhosts.scss'
const MeetTheSuperhosts = () => {
    const MeetOurTeam=[
        {
            name:'Darlene Robertson',
            positon:"Host in Atlanta" ,
            img:"https://modtel.travelerwp.com/wp-content/uploads/2022/04/team1.png"
        },
        {
            name:'Darlene Robertson',
            positon:"Host in Chiang Mai" ,
            img:"https://modtel.travelerwp.com/wp-content/uploads/2022/04/team2.png"
        },
        {
            name:'Darlene Robertson',
            positon:"Host in Atlanta" ,
            img:"https://modtel.travelerwp.com/wp-content/uploads/2022/04/team3.png"
        },
        {
            name:'Darlene Robertson',
            positon:"Host in Atlanta" ,
            img:"https://modtel.travelerwp.com/wp-content/uploads/2022/04/team4.png"
        },
        {
            name:'Darlene Robertson',
            positon:"Host in Paraty" ,
            img:"https://modtel.travelerwp.com/wp-content/uploads/2022/04/team5.png"
        },
        {
            name:'Darlene Robertson',
            positon:"Host in Atlanta" ,
            img:"https://modtel.travelerwp.com/wp-content/uploads/2022/04/team6.png"
        },
        {
            name:'Darlene Robertson',
            positon:"Host in Atlanta" ,
            img:"https://modtel.travelerwp.com/wp-content/uploads/2022/04/team7.png"
        },
        {
            name:'Darlene Robertson',
            positon:"Host in Atlanta" ,
            img:"https://modtel.travelerwp.com/wp-content/uploads/2022/04/team8.png"
        }
    ]

  return (
    <section className='MeetTheSuperhosts'>
        <h1 className='text-center p-1 h2 fw-bold mb-5'>Meet the superhosts</h1>
        <p className='text-center mb-5 w-50 fs-6 m-auto text-secondary'>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, cons, adipisci velit, sed quia non numquam eius modi ullma tempora incidunt ut.
        </p>
        <div className="container">
            <div className="row">
            {
                MeetOurTeam.map((item,index)=>{
                    return(
                        <div key={index} className="col-12 col-md-6 col-xl-3 mb-3 text-center  mb-4">
                            <div className=" cut">
                            <img className='w-100' src={item.img} alt="" />
                            
                            </div>
                            <h3>{item.name}</h3>
                            <p>{item.positon}</p>
                        </div>
                    )
                })
            }
            </div>
        </div>
    </section>
  )
}

export default MeetTheSuperhosts