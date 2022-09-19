import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import ReactPlayer from 'react-player'


const ModalImagesPreview = () => {
    
  return (
    <div>
      <Carousel>
        <div>
          <ReactPlayer
            url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
            volume='1'
            muted
            width='100%'
            playing={true}
          />
        </div>
        <div>
          <img src='https://cdn.dribbble.com/users/2146089/screenshots/12387473/media/bf9ffb522fe68ba57ebdc62bc3f16cc5.png' />
        </div>
        <div>
          <img src='https://cdn.dribbble.com/users/427857/screenshots/12318706/media/f30f662dbf160022412812881b2afb43.jpg' />
        </div>
      </Carousel>
    </div>
  )
}

export default ModalImagesPreview