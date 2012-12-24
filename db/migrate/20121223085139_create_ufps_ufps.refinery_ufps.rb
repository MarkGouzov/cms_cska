# This migration comes from refinery_ufps (originally 1)
class CreateUfpsUfps < ActiveRecord::Migration

  def up
    create_table :refinery_ufps do |t|
      t.string :title
      t.datetime :date
      t.integer :photo_id
      t.text :blurb
      t.integer :position

      t.timestamps
    end

  end

  def down
    if defined?(::Refinery::UserPlugin)
      ::Refinery::UserPlugin.destroy_all({:name => "refinerycms-ufps"})
    end

    if defined?(::Refinery::Page)
      ::Refinery::Page.delete_all({:link_url => "/ufps/ufps"})
    end

    drop_table :refinery_ufps

  end

end
