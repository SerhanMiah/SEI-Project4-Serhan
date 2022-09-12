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