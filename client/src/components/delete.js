{ userIsOwner(review) &&              
  <div className="buttons mb-4">
    <Button variant="danger" onClick={event => deleteReview(event, destinationId, reviewId)}>Delete</Button>
    <Link to={`/edit-review/${destinationId}/${reviewId}`} className='btn btn-primary'>Edit Review</Link>
  </div>  
}    