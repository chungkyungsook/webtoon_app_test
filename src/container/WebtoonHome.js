import React, { Component } from 'react';
import Header from "../component/Header";
import Gnb from "../component/Gnb";
import Footer from "../component/Footer";

import axios from 'axios/index';
import WebtoonInfo from '../component/WebtoonInfo';
import EpisodeList from '../component/EpisodeList';

import { Link } from 'react-router-dom';

class WebtoonHome extends Component{

    constructor(props){
        super(props);

        this.state = {
            webtoonId : parseInt(props.match.params.webtoonId, 10),
            webtoon  : {}, //웹툰 상세 객체
            episodeList:[], //에피소드 리스트
        }
    }

    componentDidMount(){
        this._getWebtoon();
        this._getEpisodeList();
    }

    _getWebtoon(){
        const apiUrl = '/dummy/webtoon_detail.json';

        axios.get(apiUrl).then(data=>{
            // console.log(data)
            //웹툰들 중 ID가 일치하는 웹툰을 state.webtoon에 저장
            this.setState({
                webtoon: data.data.webtoons.find(w =>(
                    w.id === this.state.webtoonId
                ))
            });
        }).catch( e => {
            console.log(e);
        })
    }

    _getEpisodeList() {
        const apiUrl = '/dummy/episode_list.json';

        axios.get(apiUrl).then(data =>{
            //웹툰ID가 일치하는 에피소드만 state.episodeList에 저장
            this.setState({
                episodeList : data.data.webtoonEpisodes.filter(episode =>(
                    episode.webtoonId === this.state.webtoonId
                ))
            });
        }).catch(e =>{
            console.log(e)
        })
    }

    render(){
        return (
            <div>
                <Header />
                <Gnb />

                    {
                        this.state.webtoon.id ? 
                        (
                            <div>
                             {/* 웹툰 상세 정보 */}
                            <WebtoonInfo webtoon={this.state.webtoon}/>
                            </div>
                        )
                        :
                        (
                            <span>LOADING...</span>
                        )
                    }

                    {
                        this.state.episodeList.length > 0?
                        (
                            // 에피소드 리스트
                            <EpisodeList episodes={this.state.episodeList}/>
                        )
                        :
                        (
                            <span>LOADING...</span>
                        )
                    }
                <Footer />
            </div>
        )
    }
}

export default WebtoonHome;