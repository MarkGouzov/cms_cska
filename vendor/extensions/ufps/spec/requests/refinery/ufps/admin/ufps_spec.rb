# encoding: utf-8
require "spec_helper"

describe Refinery do
  describe "Ufps" do
    describe "Admin" do
      describe "ufps" do
        login_refinery_user

        describe "ufps list" do
          before do
            FactoryGirl.create(:ufp, :title => "UniqueTitleOne")
            FactoryGirl.create(:ufp, :title => "UniqueTitleTwo")
          end

          it "shows two items" do
            visit refinery.ufps_admin_ufps_path
            page.should have_content("UniqueTitleOne")
            page.should have_content("UniqueTitleTwo")
          end
        end

        describe "create" do
          before do
            visit refinery.ufps_admin_ufps_path

            click_link "Add New Ufp"
          end

          context "valid data" do
            it "should succeed" do
              fill_in "Title", :with => "This is a test of the first string field"
              click_button "Save"

              page.should have_content("'This is a test of the first string field' was successfully added.")
              Refinery::Ufps::Ufp.count.should == 1
            end
          end

          context "invalid data" do
            it "should fail" do
              click_button "Save"

              page.should have_content("Title can't be blank")
              Refinery::Ufps::Ufp.count.should == 0
            end
          end

          context "duplicate" do
            before { FactoryGirl.create(:ufp, :title => "UniqueTitle") }

            it "should fail" do
              visit refinery.ufps_admin_ufps_path

              click_link "Add New Ufp"

              fill_in "Title", :with => "UniqueTitle"
              click_button "Save"

              page.should have_content("There were problems")
              Refinery::Ufps::Ufp.count.should == 1
            end
          end

        end

        describe "edit" do
          before { FactoryGirl.create(:ufp, :title => "A title") }

          it "should succeed" do
            visit refinery.ufps_admin_ufps_path

            within ".actions" do
              click_link "Edit this ufp"
            end

            fill_in "Title", :with => "A different title"
            click_button "Save"

            page.should have_content("'A different title' was successfully updated.")
            page.should have_no_content("A title")
          end
        end

        describe "destroy" do
          before { FactoryGirl.create(:ufp, :title => "UniqueTitleOne") }

          it "should succeed" do
            visit refinery.ufps_admin_ufps_path

            click_link "Remove this ufp forever"

            page.should have_content("'UniqueTitleOne' was successfully removed.")
            Refinery::Ufps::Ufp.count.should == 0
          end
        end

      end
    end
  end
end
