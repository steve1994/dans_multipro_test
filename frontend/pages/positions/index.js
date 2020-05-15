import React, { useState, useEffect } from 'react';
import Header from '../../component/header';
import Link from 'next/link';
import Router from 'next/router';
import {fetchPositions, fetchPositionsWithFilters, verifyToken} from '../../services/api';
import {differenceTwoDates} from '../../helper/utils';
import '~/public/css/positions.css';

const Datas = () => {
    const [dataPositions, setDataPositions] = useState(null)
    const [filterDescription, setFilterDescription] = useState('');
    const [filterLocation, setFilterLocation] = useState('');
    const [filterFullTime, setFilterFullTime] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem("tokenTestDansMultipro");
        verifyToken(token).then(data => {
            if (data.status === 'success') {
                fetchPositions().then(data => setDataPositions(data.results))
            } else {
                Router.push('/login')
            }
        })
    }, [])

    const handleSearchFilter = (event) => {
        event.preventDefault();
        fetchPositionsWithFilters(filterDescription,filterLocation,filterFullTime)
        .then(data => setDataPositions(data.results));
    }

    return dataPositions && (
        <div>
            <Header />
            <div className="container">
                <div className="row mt-3 align-items-end px-3">
                    <div className="col-sm-12 col-md-4 mb-3">
                        <div className="row">
                            <div className="col-12">
                                <strong>Job Description</strong>
                            </div>
                            <div className="col-12">
                                <input type="text" value={filterDescription} onChange={(e)=>setFilterDescription(e.target.value)} placeholder="Filter by title, benefits, company, and expertise" style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'10px',width:'100%'}} />
                            </div>
                        </div>

                    </div>
                    <div className="col-sm-12 col-md-4 mb-3">
                        <div className="row">
                            <div className="col-12">
                                <strong>Location</strong>
                            </div>
                            <div className="col-12">
                                <input type="text" value={filterLocation} onChange={(e)=>setFilterLocation(e.target.value)} placeholder="Filter by city, state, zip code or country" style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'10px',width:'100%'}} />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 mb-3">
                        <div className="row align-items-center">
                            <div className="col-6">
                                <input type="checkbox" checked={filterFullTime} onChange={(e)=>setFilterFullTime(e.target.checked)} />{' '}<strong>Full Time Only</strong>
                            </div>
                            <div className="col-6">
                                <button onClick={handleSearchFilter} style={{paddingTop:'10px',paddingBottom:'10px',width:'100%'}}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row my-3 p-3 container-job-list">
                    <div className="col-12 p-2">
                        <h3><strong>Job List</strong></h3>
                    </div>
                    {
                        dataPositions.map(item => (
                            <div className="col-12 p-3 element-data mb-0">
                                <div className="row">
                                    <div className="col-6">
                                        <Link href={`/positions/[id]`} as={`/positions/${item.id}`}>
                                            <a><div style={{color:'blue'}}><h5><strong>{item.title}</strong></h5></div></a>
                                        </Link>
                                        <span style={{color:'grey'}}>{item.company} - </span>
                                        <span style={{color:'green'}}><strong>{item.type}</strong></span>
                                    </div>
                                    <div className="col-6 text-right">
                                        <div>{item.location}</div>
                                        <span style={{color:'grey'}}>{differenceTwoDates(item.created_at,Date.now())} day{differenceTwoDates(item.created_at,Date.now()) > 1 ? 's' : ''} ago</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Datas
