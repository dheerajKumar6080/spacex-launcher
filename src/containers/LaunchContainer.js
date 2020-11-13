import React, {useState, useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';
import Item from './item';
import { dataGetterFromApi } from '../apicalls';
import DotLoader from '../components/DotLoader';
import { config } from '../constants';
import '../styles/Launch.css';

const Launch = (props) => {
    let loaded = props.data.length ? false : true;
    const [launch_data, setlaunchdata] = useState(props.data);    
    const [isLoading, setLoading] = useState(loaded);
    const pathname = props.historyInfo.location.pathname;

    const setFinalState = (data) => {
        setlaunchdata(data);   
        setLoading(false);  
    }

    const getFilterApidata = (url) => {
        dataGetterFromApi(url)
        .then(res => {
            setFinalState(res.data);        
        })
        .catch(err => console.log(err))
    }

    const getFinaldata = (yearPresent, launchPresent, landPresent) => {
        if(yearPresent && launchPresent && landPresent) {
            launchPresent = launchPresent === "fals" ? false : true
            landPresent = landPresent === "fals" ? false : true
            const url = config.all.replace("{yearPresent}", yearPresent).replace("{launchPresent}",launchPresent).replace("{landPresent}", landPresent);
            getFilterApidata(url);
        } else if(yearPresent && launchPresent) {
            launchPresent = launchPresent === "fals" ? false : true
            let filterdata = props.data.filter(item => {
                return (item.launch_year ===  yearPresent
                    && item.launch_success === launchPresent
                    );
            });
            setFinalState(filterdata);
        } else if(yearPresent && landPresent) {
            landPresent = landPresent === "fals" ? false : true
            let filterdata = props.data.filter(item => {
                return (item.launch_year ===  yearPresent
                    && item.rocket.first_stage.cores[0].land_success === landPresent
                    );
            });
            setFinalState(filterdata);
        } else if(launchPresent && landPresent) {
            launchPresent = launchPresent === "fals" ? false : true
            landPresent = landPresent === "fals" ? false : true
            const url = config.launch_landaddress.replace("{launchPresent}",launchPresent).replace("{landPresent}", landPresent);
            getFilterApidata(url);
        } else if(yearPresent) {
            let ldata = props.data.filter(element => {
                return element.launch_year === yearPresent
            });
            setFinalState(ldata)
        } else if(launchPresent) {
            launchPresent = launchPresent === "fals" ? false : true
            const url = config.launchadress.replace("{launchPresent}",launchPresent);
            getFilterApidata(url);
        } else if(landPresent) {
            landPresent = landPresent === "fals" ? false : true
            let ldata = props.data.filter(element => {
                return element.rocket.first_stage.cores[0].land_success === landPresent
            })
            setFinalState(ldata);
        }
    }

    useEffect(() => {
        if(props.data.length > 0 && pathname === "/") {
            setFinalState(props.data);
        }
        if(props.historyInfo && props.historyInfo.location && pathname !== "/") { 
            let {yearPresent, launchPresent, landPresent} = {yearPresent: '', launchPresent: '', landPresent: ''};
            let propSearch = props.historyInfo.location.search;
            if(propSearch.indexOf('launch_year') !== -1){               
                yearPresent = propSearch.substr(propSearch.indexOf("launch_year") + 12, 4);
            }
            if(propSearch.indexOf('launch_success') !== -1){              
                launchPresent = propSearch.substr(propSearch.indexOf("launch_success") + 15, 4);                
            }
            if(propSearch.indexOf('land_success') !== -1){              
                landPresent = propSearch.substr(propSearch.indexOf("land_success") + 13, 4);                
            }   
            getFinaldata(yearPresent, launchPresent, landPresent);     
        }        
    }, [launch_data.length, props.data, props.historyInfo, pathname])

    function renderLaunchData(){
        return (
            <Row>
            {launch_data && launch_data.length > 0 ? launch_data.map(item => {
                return (
                    <Col xs={12} md={6} lg={3} 
                        className='cardMain' 
                        key={item.mission_name} 
                        >
                        <Item  launchdata = {item} />
                    </Col>
                )               
            }) :<div className='emptydata' >
                    {'No data available for this filter'}
                </div>
            }
        </Row>
        )
    }
   
    return(
        <>
            {!isLoading ? (
                renderLaunchData()
               
            ) : 
            <div><DotLoader /></div>            
            }        
        </>
    );    
}

export default Launch;