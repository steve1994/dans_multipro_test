import React, { useState, useEffect } from 'react';
import Header from '../../component/header';
import Link from 'next/link';
import {fetchPositionById, verifyToken} from '../../services/api';
import '~/public/css/positions_detail.css';
import Router, { useRouter } from 'next/router';
import parse from 'html-react-parser';

const Detail = (props) => {

    const [detailPosition, setDetailPosition] = useState(null)

    useEffect(() => {
        let token = localStorage.getItem("tokenTestDansMultipro");
        verifyToken(token).then(data => {
            if (data.status === 'success') {
                fetchPositionById(props.idPosition).then(data => setDetailPosition(data.result));
            } else {
                Router.push('/login')
            }
        })
    }, [])

    return detailPosition && (
        <div>
            <Header />
            <div className="container p-3">
                <div className="row my-3">
                    <Link href={`/positions`}>
                        <a><div style={{color:'blue'}}><strong>Back To Main Menu</strong></div></a>
                    </Link>
                </div>
                <div className="row mb-3 p-3 container-detail-content">
                    <div className="col-12 position-detail-title">
                        <div style={{color:'grey'}}>{detailPosition.type} / {detailPosition.location}</div>
                        <div style={{color:'blue'}}><h3><strong>{detailPosition.title}</strong></h3></div>
                    </div>
                    <div className="col-12">
                        <div className="row mb-3 p-2">
                            <div className="col-sm-12 col-md-8">
                                <div>{parse(`${detailPosition.description}`)}</div>
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <div className="row">
                                    <div className="col-12 mb-3 right-bar-element">
                                        <div className="row">
                                            <div className="col-12 py-3 header-right-bar-element">
                                                <strong>Company Logo</strong>
                                            </div>
                                            <div className="col-12 my-3 content-right-bar-element">
                                                <img src={detailPosition.company_logo} style={{width:'100%'}} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 mb-3 right-bar-element">
                                        <div className="row">
                                            <div className="col-12 py-3 header-right-bar-element">
                                                <strong>How to Apply</strong>
                                            </div>
                                            <div className="col-12 my-3 content-right-bar-element">
                                                <div>{parse(`${detailPosition.how_to_apply}`)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Detail.getInitialProps = async(ctx) => {
    return {idPosition : ctx.query.id}
}

export default Detail
