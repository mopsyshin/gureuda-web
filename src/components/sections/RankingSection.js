import React, { Component } from 'react';
import rankingTitle from 'assets/ranking.png';
import classnames from 'classnames/bind';
import style from './Sections.module.scss';

const cx = classnames.bind(style);

export default class RankingSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rankingList: [
        {
          rank: '레전드',
          name: '홍주영',
        },
        {
          rank: '1등',
          name: '김지혜',
        },
        {
          rank: '2등',
          name: '나석주',
        },
        {
          rank: '3등',
          name: '신동주',
        },
        {
          rank: '4등',
          name: '윤민희',
        },
        {
          rank: '5등',
          name: 'ㅁㅆㅁㅌ',
        },
        {
          rank: '6등',
          name: '이집구르기맛집이네',
        },
      ],
    }
  }
  render() {
    return (
      <div className={cx('ranking-section')}>
        <div className={cx('title')}>
          <img src={rankingTitle} alt="ranking"/>
        </div>
        <div className={cx('ranking-list')}>
          {
            this.state.rankingList.map(item => {
              return (
                <div className={cx('item')}>
                  <div className={cx('rank')}>
                    {item.rank}
                  </div>
                  <div className={cx('name')}>
                    {item.name}
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
