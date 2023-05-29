import './index.css'

import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

const initialSlidesList = [
  {
    id: 'cc6e1752-a063-11ec-b909-0242ac120002',
    heading: 'Welcome',
    description: 'Rahul',
  },
  {
    id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
    heading: 'Agenda',
    description: 'Technologies in focus',
  },
  {
    id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
  },
  {
    id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
    heading: 'IoT',
    description: 'Wireless Technologies',
  },
  {
    id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
  },
  {
    id: 'cc6e2224-a063-11ec-b909-0242ac120002',
    heading: 'Blockchain',
    description: 'Emerging Technology',
  },
  {
    id: 'cc6e233c-a063-11ec-b909-0242ac120002',
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
  },
]

/* ----------------- */

class NxtSlide extends Component {
  state = {
    slidesList: initialSlidesList,
    activeSlideId: initialSlidesList[0].id,
    activeHeadingInput: false,
    activeDescriptionInput: false,
  }

  renderNavBar = () => (
    <nav className="nav-bar">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-logo.png"
        alt="nxt slides logo"
        className="slides-logo"
      />
      <h1 className="nav-bar-heading">Nxt Slides</h1>
    </nav>
  )

  /* ----------------- */

  renderSlidesList = () => {
    const {slidesList} = this.state

    return (
      <ol className="slides-list-container">
        {slidesList.map(eachItem => {
          const slideNum = slidesList.indexOf(eachItem) + 1

          const onClickChangeActiveTabSlidesBar = () => {
            this.setState({
              activeSlideId: eachItem.id,
              activeHeadingInput: false,
              activeDescriptionInput: false,
            })
          }

          return (
            <li
              key={eachItem.id}
              className="slides-list-item"
              testid={`slideTab${slideNum}`}
              onClick={onClickChangeActiveTabSlidesBar}
            >
              <p className="index-number">{slideNum}</p>
              <div className="slide-card">
                <h1 className="card-heading">{eachItem.heading}</h1>
                <p className="card-description">{eachItem.description}</p>
              </div>
            </li>
          )
        })}
      </ol>
    )
  }

  onClickChangeHeadingElement = () => {
    this.setState({activeHeadingInput: true})
  }

  onClickChangeDescriptionElement = () => {
    this.setState({activeDescriptionInput: true})
  }

  onBlurChangeHeading = () => {
    this.setState({
      activeHeadingInput: false,
    })
  }

  onBlurChangeDescription = () => {
    this.setState({activeDescriptionInput: false})
  }

  onChangeHeading = event => {
    const {activeSlideId} = this.state
    this.setState(prevState => ({
      slidesList: prevState.slidesList.map(eachSlide => {
        if (eachSlide.id === activeSlideId) {
          return {...eachSlide, heading: event.target.value}
        }
        return eachSlide
      }),
    }))
  }

  onChangeDescription = event => {
    const {activeSlideId} = this.state
    this.setState(prevState => ({
      slidesList: prevState.slidesList.map(eachSlide => {
        if (eachSlide.id === activeSlideId) {
          return {...eachSlide, description: event.target.value}
        }
        return eachSlide
      }),
    }))
  }

  renderSlideDisplay = () => {
    const {
      activeSlideId,
      slidesList,
      activeHeadingInput,
      activeDescriptionInput,
    } = this.state
    const cardDetails = slidesList.filter(
      eachSlide => eachSlide.id === activeSlideId,
    )
    const {heading, description} = cardDetails[0]

    const headingElement = activeHeadingInput ? (
      <input
        type="text"
        onChange={this.onChangeHeading}
        onBlur={this.onBlurChangeHeading}
        value={heading}
        className="input-box"
      />
    ) : (
      <h1
        className="display-heading"
        onClick={this.onClickChangeHeadingElement}
      >
        {heading}
      </h1>
    )
    const descriptionElement = activeDescriptionInput ? (
      <input
        type="text"
        onChange={this.onChangeDescription}
        onBlur={this.onBlurChangeDescription}
        value={description}
        className="input-box"
      />
    ) : (
      <p
        className="display-description"
        onClick={this.onClickChangeDescriptionElement}
      >
        {description}
      </p>
    )

    return (
      <div className="display-slide-container">
        {headingElement}
        {descriptionElement}
      </div>
    )
  }

  onClickAddNewSlide = () => {
    const {slidesList, activeSlideId} = this.state

    const newSlide = {
      id: uuidv4(),
      heading: 'heading',
      description: 'description',
    }

    const activeSlideIndex = slidesList.findIndex(eachSlide => {
      if (activeSlideId === eachSlide.id) {
        return true
      }
      return false
    })

    const Listslength = slidesList.length

    console.log([
      ...slidesList.slice(0, activeSlideIndex + 1),
      newSlide,
      ...slidesList.slice(activeSlideIndex + 1, Listslength),
    ])

    this.setState(prevState => ({
      slidesList: [
        ...prevState.slidesList.slice(0, activeSlideIndex + 1),
        newSlide,
        ...prevState.slidesList.slice(activeSlideIndex + 1, Listslength),
      ],
      activeSlideId: newSlide.id,
    }))
  }

  render() {
    return (
      <>
        {this.renderNavBar()}
        <div className="detail-container">
          <button
            type="button"
            className="new-btn"
            onClick={this.onClickAddNewSlide}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
              alt="new plus icon"
              className="icon-symbol"
            />
            <p className="text">New</p>
          </button>
          <div className="slides-content-container">
            <div className="slides-list">{this.renderSlidesList()}</div>
            <div className="display-slide">{this.renderSlideDisplay()}</div>
          </div>
        </div>
      </>
    )
  }
}

export default NxtSlide
