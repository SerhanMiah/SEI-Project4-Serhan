<Form className="review-form" onSubmit={handleSubmitReview}>

<Form.Group>
  <Form.Label htmlFor="reviewText" >Review Text</Form.Label>          
  <Form.Control as="textarea" rows={4} name="text" placeholder="Type Review Here" value={reviews.text} onChange={handleChange} />
</Form.Group>
<Form.Group>
  <Form.Label>Rating</Form.Label>
  <Form.Control type="text" name="theatre" placeholder="From 0 to 5" value={reviews.owner} onChange={handleChange} />
</Form.Group>
<Form.Group>
  <Form.Label>Activities</Form.Label>

  <Form.Control as="text" rows={4} name="theatre" placeholder="Add Activities" value={theatre.id} onChange={handleChange} />
</Form.Group>

</Form>

<Container as="main">
      <Row>
        { theatre ? 
          <>
            <h1>{theatre.name}</h1>
            <Col md="6">
              {/* <img className='w-100' src={theatre.location_images} alt={theatre.name} /> */}
            </Col>
            <Col md="6">
              <h2>Description</h2>
              <p>{theatre.name}</p>
              <hr />
              <h2><span>🌍</span> Origin</h2>
              <p>{theatre.name}</p>
              <hr />
              <h2><span></span> Added by</h2>
              <p>{theatre.name}</p>
              <hr />
              <h2><span></span> Likes</h2>
              <p>{theatre.likes}</p>
              <p>{theatre.dislikes}</p>
              <hr />
              <Link to="/theatre" className='btn dark'>Back to all Home</Link>
            </Col>
            <div className='liketest'>
              <Button className='btn btn-primary btn-lg btn-block' variant="primary" size="lg" value={like.likes} onClick={(event) => {
                console.log({ like })
                allLikes(event, like ) 
              } }>{like.likes}1</Button>
            </div>
            <div className='dislike-button'>
              <Button className='btn btn-primary btn-lg btn-block' variant="primary" size="lg" value={like.likes} onClick={(event) => {
                console.log({ like })
                allLikes(event, like ) 
              } }>{like.dislike}0</Button>
            </div>
            
            <Container as='section' className='review-card'>
              <h3>Reviews</h3>
              { reviews.length > 0
                ?
                reviews.map(review => {
                  const { id, owner, text } = review
                  return (                       
                    <Card key={review.id} className="re-card">
                      <Card.Body>      
                        <Card.Text>
                          {review.text} - {review.owner.username}
                        </Card.Text>                 
                      </Card.Body>
                    </Card>          
                  )
                })
                :
                <>
                  { errors ? <h2>Something went wrong. Please try again later</h2> : <p>No reviews yet</p>}
                </>
              }
            </Container>


            <form
              className="d-flex flex-column justify-content-between"
              onSubmit={handleSubmitReview}>
              <textarea
                name="text"
                placeholder="What do you think about this location?"
                maxLength="280"
                onChange={handleChange}
                required
              >
              </textarea>
              <textarea
                name="theatre"
                placeholder="location"
                maxLength="280"
                onChange={handleChange}
                required
              >
              </textarea>
              <textarea
                name="owner"
                placeholder="owner"
                maxLength="280"
                onChange={handleChange}
                required
              >
              </textarea>
              {/* {formData.text} */}
              {/* </textarea> */}
              <input type="submit" value="Add Comment" required />
            </form>
          </>
          :
          <h2 className="text-center">
            Something went wrong. Please try again later
          </h2>
        }
      </Row>

    </Container>
  )