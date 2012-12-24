class CreateUfptitle:stringsUfptitle:strings < ActiveRecord::Migration

  def up
    create_table :refinery_ufptitle:strings do |t|
      t.datetime :date
      t.integer :photo_id
      t.text :blurb
      t.integer :position

      t.timestamps
    end

  end

  def down
    if defined?(::Refinery::UserPlugin)
      ::Refinery::UserPlugin.destroy_all({:name => "refinerycms-ufptitle:strings"})
    end

    if defined?(::Refinery::Page)
      ::Refinery::Page.delete_all({:link_url => "/ufptitle:strings/ufptitle:strings"})
    end

    drop_table :refinery_ufptitle:strings

  end

end
