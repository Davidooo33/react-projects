let items = []

export default function handler(req, res){
    
    if (req.method === 'GET') {
        res.json(items)
        
    }

    if (req.method === 'POST') {
      const text = req.body.text 
      const id = items.length + 1
      items.push({id, text})
      res.json()
    }
  
    if (req.method === 'DELETE') {
      items = []
      res.json()
    }
  }