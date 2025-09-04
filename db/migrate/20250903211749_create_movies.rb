class CreateMovies < ActiveRecord::Migration[8.0]
  def change
    create_table :movies do |t|
      t.string :title
      t.integer :tmdb_id
      t.string :description
      t.string :release_date
      t.integer :runtime
      t.string :tagline
      t.string :movie_image_url

      t.timestamps
    end
  end
end
