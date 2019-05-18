import React, { Component } from 'react'
import banner from 'assets/banner.png';
import classnames from 'classnames/bind';
import style from './Sections.module.scss';

const cx = classnames.bind(style);

export default class TutorialSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          url: 'https://youtu.be/-jCM5PoYwsI',
          title: '올바른 앞구르기 자세',
          desc: '데구르 친구들을 위해 준비했어요. 올바른 구르기법!'
        },
        {
          url: 'https://youtu.be/BRfNEKKHlbA',
          title: '올바른 옆구르기 자세',
          desc: '데구르 친구들을 위해 준비했어요. 올바른 구르기법!'
        },
        {
          url: 'https://youtu.be/NjDw0TM4yjw',
          title: '올바른 뒤구르기 자세',
          desc: '데구르 친구들을 위해 준비했어요. 올바른 구르기법!'
        }
      ]
    }
  }
  toYoutube = (url) => {
    window.open(url);
  }
  render() {
    return (
      <div>
        <div className={cx('tutorial-list')}>
          {
            this.state.list.map(item => {
              return (
                <div className={cx('item-wrapper')}
                    onClick={() => this.toYoutube(item.url)}>
                  <div className={cx('title')}>
                    {item.title}
                  </div>
                  <div className={cx('desc')}>
                    {item.desc}
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className={cx('banner')}>
          <img src={banner} alt="banner"/>
        </div>
      </div>
    )
  }
}
