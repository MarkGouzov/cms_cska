module Refinery
  module Ufptitle:strings
    class Ufptitle:string < Refinery::Core::BaseModel
      self.table_name = 'refinery_ufptitle:strings'

      attr_accessible :date, :photo_id, :blurb, :position

      acts_as_indexed :fields => [:blurb]

      validates :blurb, :presence => true, :uniqueness => true

      belongs_to :photo, :class_name => '::Refinery::Image'
    end
  end
end
