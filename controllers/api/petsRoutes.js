const router = require('express').Router();
const withAuth = require('../../utils/withAuth');
const { Pets } = require('../../Models');
// imported multer middleware
const upload = require('../../server');

// delete a pet 
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const petsData = await Pets.destroy({
            where: {
                id: req.params.id,
                // user_id: req.session.user_id,
            },
        });
        
        if (!petsData) {
            res.status(404).json({ message: 'No pet found with this id!' });
            return;
        }
        
        res.render('petsCard', {
            petsData,
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// create a new pet
// multer upload syntax should be added here as: upload.single('pet_image_url')
router.post('/', withAuth, async (req, res) => {
    try {
      const petsData = await Pets.create({
        pet_name: req.body.pet_name,
        pet_type: req.body.pet_type,
        pet_breed: req.body.pet_breed,
        pet_age: req.body.pet_age,
        pet_description: req.body.pet_description,
        pet_image_url: req.body.pet_image_url,
        pet_size: req.body.pet_size,
        pet_allergies: req.body.pet_allergies,
        pet_medication: req.body.pet_medication,
        pet_grooming: req.body.pet_grooming,
        user_id: req.session.user_id,
      });
  
      res.status(201).json(petsData);
      // Render the 'petsCard' view
      res.render('petsCard', {
        petsData,
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.put('/:id', async (req, res) => {

    try {
        // update a pet by its `id` value
        const updatedPet = await Pets.update(
            {
                ...req.body,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        res.status(200).json(updatedPet);

    } catch (err) {
        res.status(500).json(err);
    }

});
// // mutler upload syntax should be added here as: upload.single('pet_image_url')
// // getting syntax error when adding multer upload syntax
// // single() is not a function
// router.post('/upload', upload.single('pet_image_url'), (req, res) => {
//     console.log(req.file);
//     try {
//         res.status(200).json(req.file);
//         if (!req.file) {
//             res.status(500).json(err);
//         }
//     }
//     catch (err) {
//         res.status(500).json(err);
//     }
// });


module.exports = router;
