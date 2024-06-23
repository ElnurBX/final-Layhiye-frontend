import React from 'react'
import './MeetOurTeem.scss'
const MeetOurTeem = () => {
    const MeetOurTeam=[
        {
            name:'Darlene Robertson',
            positon:"Founder & CEO" ,
            img:"https://modtel.travelerwp.com/wp-content/uploads/2022/04/team1.png"
        },
        {
            name:'Darlene Robertson',
            positon:"Founder & CEO" ,
            img:"https://modtel.travelerwp.com/wp-content/uploads/2022/04/team2.png"
        },
        {
            name:'Darlene Robertson',
            positon:"Founder & CEO" ,
            img:"https://modtel.travelerwp.com/wp-content/uploads/2022/04/team3.png"
        },
        {
            name:'Darlene Robertson',
            positon:"Founder & CEO" ,
            img:"https://modtel.travelerwp.com/wp-content/uploads/2022/04/team4.png"
        },
        {
            name:'Darlene Robertson',
            positon:"Founder & CEO" ,
            img:"https://modtel.travelerwp.com/wp-content/uploads/2022/04/team5.png"
        },
        {
            name:'Darlene Robertson',
            positon:"Founder & CEO" ,
            img:"https://modtel.travelerwp.com/wp-content/uploads/2022/04/team6.png"
        },
        {
            name:'Darlene Robertson',
            positon:"Founder & CEO" ,
            img:"https://modtel.travelerwp.com/wp-content/uploads/2022/04/team7.png"
        },
        {
            name:'Darlene Robertson',
            positon:"Founder & CEO" ,
            img:"https://modtel.travelerwp.com/wp-content/uploads/2022/04/team8.png"
        }
    ]

  return (
    <section className='MeetOurTeem'>
        <h1 className='text-center p-1 h2 fw-bold mb-5'>Meet our team</h1>
        <div className="container">
            <div className="row">
            {
                MeetOurTeam.map((item,index)=>{
                    return(
                        <div className="col-12 col-md-6 col-xl-3 mb-3 text-center ">
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

export default MeetOurTeem